// Note: load this file after item-components.js and all-item-names.js
// itemComponents contains an array of components and quantities, stored against item name. It is generated during the data processing stage
// allItemNames contains the HTML IDs for each item, stored against item name. It is generated during the data processing stage

var selectedItems = []            // Stores the names of selected items
var selectedItemsComponents = {}  // Stores the name and number of each component needed to craft the selected items

// Here we define a an array of components which we don't want to display the quantities of in the displayed component list
// This is mostly nested parts like chassis and systems, and weapons used to craft other weapons
ignoredComponents = ["Aegis", "Akbolto", "Akstiletto", "Amphis", "Ankyros", "Atomos", "Barrel", "Barrels", "Blade", "Blades", "Blueprint", "Bo", "Bolto", "Boltor", "Bonewidow Capsule", "Bonewidow Casing", "Bonewidow Engine", "Bonewidow Weapon Pod", "Boot", "Broken War", "Bronco Prime", "Bronco", "Carapace", "Cerebrum", "Cernos", "Cestra", "Chain", "Chassis", "Core", "Cortege Barrel", "Cortege Receiver", "Cortege Stock", "Decurion Barrel", "Decurion Receiver", "Disc", "Drakgoon", "Dual Cleavers", "Dual Kamas", "Dual Skana", "Dual Zoren", "Furis", "Galatine", "Gammacor", "Gauntlet", "Grakata", "Grip", "Guard", "Handle", "Harness", "Head", "Heatsink", "Hikou", "Hilt", "Kama", "Kogake", "Kohmak", "Kraken", "Krohkur", "Kronen", "Kunai", "Lato", "Latron", "Left Gauntlet", "Lex Prime", "Lex", "Limbs", "Link", "Lower Limb", "Magistar", "Magnus", "Miter", "Morgha Barrel", "Morgha Receiver", "Morgha Stock", "Motor", "Mutalist Cernos", "Neuroptics", "Nikana", "Ninkondi", "Ornament", "Pouch", "Receiver", "Receivers", "Right Gauntlet", "Rivet", "Stars", "Stock", "String", "Subcortex", "Systems", "Tipedo", "Upper Limb", "Vasto Prime", "Vasto", "Viper", "Voidrig Capsule", "Voidrig Casing", "Voidrig Engine", "Voidrig Weapon Pod", "War Blade", "War Hilt", "Wings"]

/**
 * Identify and count the components needed to craft all of the items in selectedItems, storing the counts in 
 * selectedItemsComponents, then call the function to update the displayed list of components.
 */
function updateSelectedItemComponents() {
  // Reset the components list
  selectedItemsComponents = {}

  // For each selected item, access the components
  selectedItems.forEach(itemName => {
    components = itemComponents[itemName]
    // console.log(components)

    // For each component, update the count in selectedItemComponents
    components.forEach(component => {
      // If component not in ignored components, update the summed costs
      if (!ignoredComponents.includes(component.name)) {
        if (component.name in selectedItemsComponents) {
          selectedItemsComponents[component.name] += component.itemCount
        } else {
          selectedItemsComponents[component.name] = component.itemCount
        }
      }
    });
  });

  updateComponentListDisplay()
}

/**
 * Refresh the on-page list of required components.
 */
function updateComponentListDisplay() {
  // Convert selectedItemsComponents to an array then sort it alphabetically
  var selectedItemsComponentsArray = Object.entries(selectedItemsComponents)
  selectedItemsComponentsArray.sort()

  // Get the component list container and start the string which will be placed into it
  var componentListContainer = document.getElementById("componentListContainer")
  var newHTML = "<p>"
  
  // For each component we want listed, append the name and quantity to the newHTML string 
  selectedItemsComponentsArray.forEach(component => {
    var current = componentListContainer.innerHTML
    var resourceHTML = `${component[0]}: ${component[1]}<br>`
    newHTML = newHTML + resourceHTML
  });

  // Finish the newHTML string and set the component list's contents to it
  newHTML += "</p>"
  componentListContainer.innerHTML = newHTML
}

/**
 * Add the item to the list of selected items, update the corresponding cookie, then update the displayed list of components.
 */
function addItem(itemName) {
  // Add the item name to the internal list of selected items
  selectedItems.push(itemName)

  // Update the cookie
  localStorage.setItem(allItemNames[itemName], "selected")

  // Regenerate the list of required components
  updateSelectedItemComponents()
}

/**
 * Remove the item from the list of selected items, remove the corresponding cookie, then update the displayed list of components.
 */
function removeItem(itemName) {
  // Remove the item name from the internal list of selected items
  selectedItems.splice(selectedItems.indexOf(itemName), 1)

  // Update the cookie
  localStorage.removeItem(allItemNames[itemName])

  // Regenerate the list of required components
  updateSelectedItemComponents()
}

/**
 * Toggle the status of the provided item via the addItem and removeItem functions.
 */
function toggleItem(itemName) {
  if (selectedItems.includes(itemName)) {
    removeItem(itemName)
  } else {
    addItem(itemName)
  }
}

/**
 * Update the button element to display as pressed and update the internal list of selected items.
 * This function is used in bulk selection operations, and as such we don't want to update the displayed list until after all items have been selected.
 * As such, this function does not use the addItem function, which calls the display update at the end. 
 */
function selectItem(itemName) {
  button = document.querySelector("#" + allItemNames[itemName])
  button.classList.remove("active")
  selectedItems.push(itemName)
  localStorage.setItem(allItemNames[itemName], "selected")
}

/**
 * Update the button element to display as not pressed and update the internal list of selected items.
 * This function is used in bulk deselection operations, and as such we don't want to update the displayed list until after all items have been deselected.
 * As such, this function does not use the removeItem function, which calls the display update at the end. 
 */
function deselectItem(itemName) {
  button = document.querySelector("#" + allItemNames[itemName])
  button.classList.add("active")
  selectedItems.splice(selectedItems.indexOf(itemName), 1)
  localStorage.removeItem(allItemNames[itemName])
}

/**
 * Populate the already selected items from the cookies and update the displayed list of components to match.
 */
function loadSelectionsFromCookies() {
  // Iterate over all items, selecting those that have a cookie stored which is equal to "selected" 
  Object.keys(allItemNames).forEach(itemName => {
    itemNameSafe = allItemNames[itemName]
    itemCookie = localStorage.getItem(itemNameSafe)
    if (itemCookie != null) {
      if (itemCookie == "selected") {
        // Call selectItem to add the item to the internal list of selected items without updating the display, as updating the display for each item
        // causes page-freezing lag
        selectItem(itemName)
      }
    }
  })
  // Now that all of the selected items are displayed as pressed and listed in the selectedItems array, update the displayed list of components
  updateSelectedItemComponents()
}

/**
 * Bulk select all items, setting their buttons to pressed and updating the displayed list of components.
 */
function selectAllItems() {
  selectedItems = []
  Object.keys(allItemNames).forEach(itemName => {
    selectItem(itemName)
  })
  updateSelectedItemComponents()
}

/**
 * Bulk deselect all items, setting their buttons to unpressed and updating the displayed list of components.
 */
function deselectAllItems() {
  Object.keys(allItemNames).forEach(itemName => {
    deselectItem(itemName)
  })
  updateSelectedItemComponents()
}

// When this JS file is loaded, load the selected items from the cookies
loadSelectionsFromCookies()
