/**
 * Register the custom shop journal sheet
 */
Hooks.once("init", () => {
  console.log("Custom Shop Journals | Initializing module");

  // Register the custom sheet class
  Journal.registerSheet("custom-shop-journals", ShopJournalSheet, {
    types: ["base"],
    label: "Shop Journal Sheet",
    makeDefault: false
  });
});

/**
 * Custom Journal Sheet Class for Shop display
 */
class ShopJournalSheet extends JournalSheet {
  /**
   * Override the default template path
   */
  get template() {
    return "modules/custom-shop-journals/templates/shop-journal-sheet.html";
  }

  /**
   * Prepare data for the template
   */
  async getData(options) {
    const data = await super.getData(options);

    // Load shop data from flags (or fall back to empty/default)
    const shopData = this.document.getFlag("custom-shop-journals", "shopData") || {
      type: "General Goods",
      location: "Unknown",
      owner: "Unknown",
      items: []
    };

    data.shop = shopData;

    return data;
  }

  /**
   * Activate custom listeners (e.g. buttons, buying)
   */
  activateListeners(html) {
    super.activateListeners(html);

    // Example: log clicked item
    html.find(".shop-item").click(ev => {
      const itemName = ev.currentTarget.dataset.itemName;
      ui.notifications.info(`You clicked on "${itemName}"`);
    });
  }
}
