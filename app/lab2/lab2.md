# Lab 2

### Exercise 1 : Avatar Component

Create a circular avatar component that displays an image.

**Requirements:**
- Display a circular image
- Accept `source` and `size` props
- Add a border around the avatar
- Make it reusable

**Starter Code:**

```javascript
import { Image, StyleSheet } from 'react-native';

function Avatar({ source, size = 50 }) {
  // TODO: Implement this component
  return null;
}

export default Avatar;

```

### Exercise 2 : Tag Component

Create a small tag/chip component for categories or labels.

**Requirements:**
- Display text inside a rounded rectangle
- Support different color variants (default, primary, success, warning, danger)
- Add proper padding and styling
- Handle tap events (optional)

**Starter Code:**

```javascript
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Tag({ text, variant = 'default', onPress }) {
  // TODO: Implement this component
  return null;
}

export default Tag;

```


**Color Suggestions:**
```javascript
const colors = {
  default: { bg: '#e0e0e0', text: '#666' },
  primary: { bg: '#007AFF', text: '#fff' },
  success: { bg: '#34C759', text: '#fff' },
  warning: { bg: '#FF9500', text: '#fff' },
  danger: { bg: '#FF3B30', text: '#fff' },
};
```

### Exercise 3: Stat Card 

Create a statistics display card showing a number and label.

**Requirements:**
- Display a large number (the stat value)
- Display a label below the number
- Add an optional icon above the number
- Include optional percentage change (+ or -)
- Style it like a modern dashboard card

**Starter Code:**

```javascript
import { View, Text, StyleSheet } from 'react-native';

function StatCard({ value, label, icon, change }) {
  // TODO: Implement this component
  // change is a number like 12.5 (for +12.5%) or -8.3 (for -8.3%)
  return null;
}

export default StatCard;

// Test it with:
// <StatCard 
//   value="2,847" 
//   label="Total Users" 
//   icon="👥"
//   change={12.5}
// />
```

### Exercise 4 : Recipe 

Build a recipe browsing app with multiple components working together.
The Final Result Should Include:

1. **Recipe Card Component** showing:
   - Recipe image
   - Recipe title
   - Cooking time
   - Difficulty level
   - Rating (stars)
   - Tags (vegetarian, quick, etc.)

2. **Recipe List** displaying multiple recipe cards


#### Instructions

#### Step 1: Create the Recipe Data

Mock data for the recipes.

```javascript
const RECIPES = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400',
    cookTime: 25,
    difficulty: 'Medium',
    rating: 4.5,
    tags: ['Italian', 'Pasta', 'Quick'],
  },
  {
    id: '2',
    title: 'Greek Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
    cookTime: 10,
    difficulty: 'Easy',
    rating: 4.8,
    tags: ['Vegetarian', 'Healthy', 'Quick'],
  },
  {
    id: '3',
    title: 'Beef Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
    cookTime: 30,
    difficulty: 'Easy',
    rating: 4.6,
    tags: ['Mexican', 'Spicy'],
  },
  {
    id: '4',
    title: 'Chicken Curry',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400',
    cookTime: 45,
    difficulty: 'Hard',
    rating: 4.7,
    tags: ['Indian', 'Spicy'],
  },
  {
    id: '5',
    title: 'Caesar Salad',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    cookTime: 15,
    difficulty: 'Easy',
    rating: 4.4,
    tags: ['Vegetarian', 'Healthy', 'Quick'],
  },
];
```

#### Step 2: Build RecipeCard Component

Create a card that displays a single recipe beautifully.

```javascript
import { View, Text, Image, StyleSheet } from 'react-native';

function RecipeCard({ recipe }) {
  // TODO: Implement the recipe card
  // Requirements:
  // 1. Show recipe image (height: 200)
  // 2. Display title (bold, 18px)
  // 3. Show cook time with clock emoji ⏱️
  // 4. Display difficulty badge
  // 5. Show rating with stars
  // 6. Display tags using the Tag component from Exercise 1.2
  
  return (
    <View style={styles.card}>
      {/* Your code here */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  // Add more styles
});

export default RecipeCard;
```


#### Step 3: Build the RecipeList Screen

Build a Modal to show more details when a recipe is tapped.


# Links

[Components](https://reactnative.dev/docs/0.81/components-and-apis)
[Modal](https://reactnative.dev/docs/0.81/modal)