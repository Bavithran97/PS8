//Create a JSON object representing a person with properties like name, age, and address. Add methods to the object to calculate the person's birth year and full address
var person = {
    "name": "John Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipcode": "12345"
    },
    "calculateBirthYear": function() {
      var currentYear = new Date().getFullYear();
      return currentYear - this.age;
    },
    "getFullAddress": function() {
      return this.address.street + ", " + this.address.city + ", " + this.address.state + ", " + this.address.zipcode;
    }
  };



//Write a function that takes two JSON objects as input and merges them into a single JSON object. Handle conflicts if both objects have the same property
function mergeJSONObjects(obj1, obj2) {
  // Create a new object to store the merged result
  var mergedObj = {};

  // Merge properties from obj1
  for (var key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      mergedObj[key] = obj1[key];
    }
  }

  // Merge properties from obj2, handling conflicts
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      // Check if the property already exists in mergedObj
      if (mergedObj.hasOwnProperty(key)) {
        // If the property exists, handle conflict (you can choose any strategy here)
        // For simplicity, let's just append '_2' to the property name
        mergedObj[key + '_2'] = obj2[key];
      } else {
        // If the property doesn't exist, simply add it to mergedObj
        mergedObj[key] = obj2[key];
      }
    }
  }

  return mergedObj;
}

// Example usage:
var obj1 = {
  "name": "John Doe",
  "age": 30,
  "address": "123 Main St"
};

var obj2 = {
  "age": 35,
  "city": "Anytown"
};

var mergedObject = mergeJSONObjects(obj1, obj2);
console.log(mergedObject);



//Write a function to deep clone a JSON object, i.e., create a new JSON object with the same structure and values as the original object, but not referencing the same memory
function deepClone(obj) {
  // Check if obj is null or not an object
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Create a new object or array to store the cloned properties
  var clone = Array.isArray(obj) ? [] : {};

  // Iterate over each property of obj
  for (var key in obj) {
    // Check if the property belongs to obj itself and not inherited
    if (obj.hasOwnProperty(key)) {
      // Recursively clone each property
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

// Example usage:
var originalObject = {
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
};

var clonedObject = deepClone(originalObject);
console.log(clonedObject);



//Write a function that takes a JSON object and a path (string representing the path to a property in the object, e.g., "person.address.city") and returns the value at that path in the object. Handle cases where the path is invalid
function getValueAtPath(obj, path) {
  // Split the path into an array of keys
  var keys = path.split('.');

  // Initialize a variable to store the value at the specified path
  var value = obj;

  // Traverse through each key in the keys array
  for (var i = 0; i < keys.length; i++) {
    // Check if the current value is null or undefined
    if (value === null || value === undefined) {
      // If so, the path is invalid, return undefined
      return undefined;
    }

    // Get the value associated with the current key
    value = value[keys[i]];
  }

  // Return the value at the specified path
  return value;
}

// Example usage:
var person = {
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  }
};

var path = "address.city";
var valueAtPath = getValueAtPath(person, path);
console.log(valueAtPath); // Output: "Anytown"

path = "address.zipcode";
valueAtPath = getValueAtPath(person, path);
console.log(valueAtPath); // Output: undefined (invalid path)



//Implement a function to flatten a nested JSON object, i.e., convert it into a flat JSON object where each key is a dot-separated path to a leaf node in the original object
function flattenObject(obj, parentKey = '') {
  // Initialize an empty object to store the flattened result
  var flattenedObj = {};

  // Iterate through each property of the object
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Create the path for the current key
      var currentPath = parentKey ? parentKey + '.' + key : key;

      // Check if the current property is an object and not null
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recursively flatten nested objects
        var nestedObj = flattenObject(obj[key], currentPath);
        // Merge the nested flattened object into the result
        Object.assign(flattenedObj, nestedObj);
      } else {
        // If the current property is a leaf node, add it to the flattened object
        flattenedObj[currentPath] = obj[key];
      }
    }
  }

  return flattenedObj;
}

// Example usage:
var nestedObject = {
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown"
  },
  "contacts": {
    "email": "john.doe@example.com",
    "phone": {
      "home": "123-456-7890",
      "work": "987-654-3210"
    }
  }
};

var flattenedObject = flattenObject(nestedObject);
console.log(flattenedObject);