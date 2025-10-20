class ProductForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    this.submitButtonText = this.submitButton?.querySelector("span");
    this.loadingSpinner = this.submitButton?.querySelector(".loading-spinner");

    this.init();
  }

  init() {
    if (!this.form) {
      return; // Silently return if form not found (mobile/desktop specific)
    }

    console.log(`Product form ${this.form.id} initialized`);
    this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    console.log("Form submit intercepted");

    if (this.submitButton.getAttribute("disabled") === "disabled") return;

    // Check if variant is selected
    const variantInput = this.form.querySelector('input[name="id"]');
    if (!variantInput || !variantInput.value) {
      console.warn("No variant selected");
      return;
    }

    // Add immediate visual feedback - button turns black
    this.submitButton.classList.add("is-adding-to-cart");
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
        // Remove visual feedback classes
        this.submitButton.classList.remove("is-adding-to-cart");
        this.submitButton.removeAttribute("disabled");
        this.loadingSpinner?.classList.add("hidden");
      });
  }
}

class ProductVariantSelector {
  constructor() {
    const productJson = document.getElementById("product-json");
    if (!productJson) return;

    this.product = JSON.parse(productJson.textContent);

    // Get currency from either mobile or desktop container
    const mobileContainer = document
      .querySelector("#product-form-mobile")
      ?.closest(".product-form-wrapper");
    const desktopContainer = document
      .querySelector("#product-form-desktop")
      ?.closest(".product-form-wrapper");
    const container = mobileContainer || desktopContainer;
    this.currency = container?.dataset.currency || "USD";

    // Handle both mobile and desktop variant buttons
    this.variantButtonsMobile = document.querySelectorAll(
      ".variant-option-mobile"
    );
    this.variantButtonsDesktop = document.querySelectorAll(
      ".variant-option-desktop"
    );
    this.variantButtons = [
      ...this.variantButtonsMobile,
      ...this.variantButtonsDesktop,
    ];

    // Get both mobile and desktop elements
    this.variantInputMobile = document.getElementById(
      "product-variant-id-mobile"
    );
    this.variantInputDesktop = document.getElementById(
      "product-variant-id-desktop"
    );
    this.submitButtonMobile = document.querySelector(
      '#product-form-mobile button[type="submit"] span'
    );
    this.submitButtonDesktop = document.querySelector(
      '#product-form-desktop button[type="submit"] span'
    );

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

    // Check initial state and disable button if needed
    this.checkAndUpdateButtonState();
  }

  checkAndUpdateButtonState() {
    // Count how many option positions exist
    const totalOptions = this.product.options.length;
    const selectedCount = Object.keys(this.selectedOptions).length;

    // If not all options are selected, disable the button
    const allOptionsSelected = selectedCount === totalOptions;

    if (!allOptionsSelected) {
      // Format the minimum price
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.currency,
      });
      const formattedPrice = formatter.format(this.product.price_min / 100);

      // Disable both buttons with price shown
      if (this.submitButtonMobile) {
        const mobileBtn = this.submitButtonMobile.closest("button");
        if (mobileBtn) {
          mobileBtn.disabled = true;
          this.submitButtonMobile.textContent = `${formattedPrice} - Add to cart`;
        }
      }
      if (this.submitButtonDesktop) {
        const desktopBtn = this.submitButtonDesktop.closest("button");
        if (desktopBtn) {
          desktopBtn.disabled = true;
          this.submitButtonDesktop.textContent = `${formattedPrice} - Add to cart`;
        }
      }
    }
  }

  handleOptionClick(button) {
    const position = button.dataset.optionPosition;
    const value = button.dataset.optionValue;

    // Update selected options
    this.selectedOptions[position] = value;

    // Update UI for this option group (both mobile and desktop)
    document
      .querySelectorAll(`[data-option-position="${position}"]`)
      .forEach((btn) => {
        btn.dataset.selected = "false";
      });

    // Set selected on both mobile and desktop buttons with this value
    document
      .querySelectorAll(
        `[data-option-position="${position}"][data-option-value="${value}"]`
      )
      .forEach((btn) => {
        btn.dataset.selected = "true";
      });

    // Find matching variant
    this.updateVariant();
  }

  updateVariant() {
    // Check if all options are selected
    const totalOptions = this.product.options.length;
    const selectedCount = Object.keys(this.selectedOptions).length;

    if (selectedCount < totalOptions) {
      // Not all options selected, disable button
      this.checkAndUpdateButtonState();
      return;
    }

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
      // Update both mobile and desktop hidden inputs
      if (this.variantInputMobile)
        this.variantInputMobile.value = matchingVariant.id;
      if (this.variantInputDesktop)
        this.variantInputDesktop.value = matchingVariant.id;

      // Format price
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: this.currency,
      });
      const formattedPrice = formatter.format(matchingVariant.price / 100);

      // Update both mobile and desktop submit buttons with price
      const buttonText = matchingVariant.available
        ? `${formattedPrice} - Add to cart`
        : `${formattedPrice} - Sold out`;

      if (this.submitButtonMobile) {
        this.submitButtonMobile.textContent = buttonText;
        const mobileBtn = this.submitButtonMobile.closest("button");
        if (mobileBtn) mobileBtn.disabled = !matchingVariant.available;
      }
      if (this.submitButtonDesktop) {
        this.submitButtonDesktop.textContent = buttonText;
        const desktopBtn = this.submitButtonDesktop.closest("button");
        if (desktopBtn) desktopBtn.disabled = !matchingVariant.available;
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
    // Initialize both mobile and desktop forms
    new ProductForm("product-form-mobile");
    new ProductForm("product-form-desktop");
  });
} else {
  new ProductVariantSelector();
  // Initialize both mobile and desktop forms
  new ProductForm("product-form-mobile");
  new ProductForm("product-form-desktop");
}
