// Loaded at the end of the page

// itemComponents data is loaded in previous script, which is generated 

var selectedItems = []

var selectedItemsComponents = {}

ignoredComponents = ["Akbolto", "Akstiletto", "Amphis", "Ankyros", "Atomos", "Barrel", "Barrels", "Blade", "Blades", "Blueprint", "Bo", "Bolto", "Boltor", "Boot", "Broken War", "Bronco Prime", "Bronco", "Carapace", "Cerebrum", "Cernos", "Cestra", "Chain", "Chassis", "Core", "Cortege Barrel", "Cortege Receiver", "Cortege Stock", "Decurion Barrel", "Decurion Receiver", "Detonite Injector", "Disc", "Drakgoon", "Dual Cleavers", "Dual Kamas", "Dual Skana", "Dual Zoren", "Furis", "Galatine", "Gammacor", "Gauntlet", "Grakata", "Grip", "Guard", "Handle", "Head", "Heatsink", "Hikou", "Hilt", "Kama", "Kogake", "Kohmak", "Kraken", "Krohkur", "Kronen", "Kunai", "Lato", "Latron", "Left Gauntlet", "Lex Prime", "Lex", "Limbs", "Link", "Lower Limb", "Magistar", "Magnus", "Miter", "Morgha Barrel", "Morgha Receiver", "Morgha Stock", "Motor", "Mutalist Cernos", "Nikana", "Ninkondi", "Ornament", "Pouch", "Receiver", "Receivers", "Right Gauntlet", "Rivet", "Stars", "Stock", "String", "Subcortex", "Systems", "Tipedo", "Upper Limb", "Vasto Prime", "Vasto", "Viper", "War Blade", "War Hilt"]

/**
 * 
 */
function updateSelectedItemComponents() {
  // Reset the components list. Replace with updating functionality later
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

  // console.log(selectedItemsComponents)
  updateComponentListDisplay()
}

/**
 * Refresh the on-page list of required components.
 */
function updateComponentListDisplay() {
  // Get the component list container, then reset it
  var componentListContainer = document.getElementById("componentListContainer")
  componentListContainer.innerHTML = ""

  selectedItemsComponentsArray = Object.entries(selectedItemsComponents)
  selectedItemsComponentsArray.sort()

  selectedItemsComponentsArray.forEach(component => {
    var current = componentListContainer.innerHTML
    var resourceHTML = `<p>${component[0]}: ${component[1]}</p>`
    componentListContainer.innerHTML = current + resourceHTML
  });
}

function addItem(itemName) {
  // Add the item name to the internal list of selected items
  selectedItems.push(itemName)

  // Update the cookie
  localStorage.setItem(allItemNames[itemName], "selected")

  // Regenerate the list of required components
  updateSelectedItemComponents()
}

function removeItem(itemName) {
  // Remove the item name from the internal list of selected items
  selectedItems.splice(selectedItems.indexOf(itemName), 1)

  // Update the cookie
  localStorage.removeItem(allItemNames[itemName])

  // Regenerate the list of required components
  updateSelectedItemComponents()
}

function toggleItem(itemName) {
  if (selectedItems.includes(itemName)) {
    removeItem(itemName)
  } else {
    addItem(itemName)
  }
}

// Update the button element to pressed and update the list of components
function selectItem(itemName) {
  button = document.querySelector("#" + allItemNames[itemName])
  button.classList.remove("active")
  selectedItems.push(itemName)
  localStorage.setItem(allItemNames[itemName], "selected")
}

// Update the button element to not pressed and update the list of components
function deselectItem(itemName) {
  button = document.querySelector("#" + allItemNames[itemName])
  button.classList.add("active")
  selectedItems.splice(selectedItems.indexOf(itemName), 1)
  localStorage.removeItem(allItemNames[itemName])
}

// Populate the selections from the cookies
function loadSelectionsFromCookies() {
  Object.keys(allItemNames).forEach(itemName => {
    itemNameSafe = allItemNames[itemName]
    itemCookie = localStorage.getItem(itemNameSafe)
    if (itemCookie != null) {
      if (itemCookie == "selected") {
        selectItem(itemName)
      }
    }
  })
  updateSelectedItemComponents()
}

function selectAllItems() {
  selectedItems = []
  Object.keys(allItemNames).forEach(itemName => {
    selectItem(itemName)
  })
  updateSelectedItemComponents()
}

function deselectAllItems() {
  Object.keys(allItemNames).forEach(itemName => {
    deselectItem(itemName)
  })
  updateSelectedItemComponents()
}

loadSelectionsFromCookies()
