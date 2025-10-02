class ProductForm {
  constructor() {
    this.form = document.getElementById("product-form");
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    this.submitButtonText = this.submitButton?.querySelector("span");
    this.loadingSpinner = this.submitButton?.querySelector(".loading-spinner");

    this.init();
  }

  init() {
    if (!this.form) {
      console.error("Product form not found");
      return;
    }

    console.log("Product form initialized, preventing default submission");
    this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    console.log("Form submit intercepted");

    if (this.submitButton.getAttribute("disabled") === "disabled") return;

    this.submitButton.setAttribute("disabled", "disabled");
    this.loadingSpinner?.classList.remove("hidden");

    const formData = new FormData(this.form);

    // Add sections to fetch for cart updates (header includes cart-sidebar)
    formData.append("sections", "header");
    formData.append("sections_url", window.location.pathname);

    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          console.error("Add to cart error:", response);
          return;
        }

        console.log("Item added to cart successfully:", response);

        // Update cart sidebar and open it
        if (window.cartSidebar) {
          window.cartSidebar.renderContents({ sections: response.sections });
        } else {
          console.warn("Cart sidebar not initialized");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      })
      .finally(() => {
        this.submitButton.removeAttribute("disabled");
        this.loadingSpinner?.classList.add("hidden");
      });
  }
}

class ProductVariantSelector {
  constructor() {
    const productJson = document.getElementById("product-json");
    const container = document.querySelector(".product-form-wrapper");
    this.product = JSON.parse(productJson.textContent);
    this.currency = container.dataset.currency;
    this.variantButtons = document.querySelectorAll(".variant-option");
    this.variantInput = document.getElementById("product-variant-id");
    this.priceElement = document.querySelector(".product-info .text-xl");
    this.submitButton = document.querySelector('button[type="submit"]');
    this.selectedOptions = {};

    this.init();
  }

  init() {
    // Initialize selected options from current variant
    this.variantButtons.forEach((button) => {
      if (button.dataset.selected === "true") {
        const position = button.dataset.optionPosition;
        const value = button.dataset.optionValue;
        this.selectedOptions[position] = value;
      }

      button.addEventListener("click", (e) => {
        if (!button.disabled) {
          this.handleOptionClick(button);
        }
      });
    });
  }

  handleOptionClick(button) {
    const position = button.dataset.optionPosition;
    const value = button.dataset.optionValue;

    // Update selected options
    this.selectedOptions[position] = value;

    // Update UI for this option group
    document
      .querySelectorAll(`[data-option-position="${position}"]`)
      .forEach((btn) => {
        btn.dataset.selected = "false";
      });
    button.dataset.selected = "true";

    // Find matching variant
    this.updateVariant();
  }

  updateVariant() {
    // Build option array from selected options
    const options = [];
    for (let i = 1; i <= Object.keys(this.selectedOptions).length; i++) {
      options.push(this.selectedOptions[i.toString()]);
    }

    // Find variant that matches all selected options
    const matchingVariant = this.product.variants.find((variant) => {
      return options.every((option, index) => {
        return variant.options[index] === option;
      });
    });

    if (matchingVariant) {
      // Update hidden input
      this.variantInput.value = matchingVariant.id;

      // Update price
      if (this.priceElement) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: this.currency,
        });
        this.priceElement.textContent = formatter.format(
          matchingVariant.price / 100
        );
      }

      // Update submit button
      if (this.submitButton) {
        if (matchingVariant.available) {
          this.submitButton.disabled = false;
          this.submitButton.textContent = "Add to cart";
        } else {
          this.submitButton.disabled = true;
          this.submitButton.textContent = "Sold out";
        }
      }

      // Update URL without page reload
      const url = new URL(window.location);
      url.searchParams.set("variant", matchingVariant.id);
      window.history.replaceState({}, "", url);
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ProductVariantSelector();
    new ProductForm();
  });
} else {
  new ProductVariantSelector();
  new ProductForm();
}
