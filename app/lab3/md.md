# Lab 3

## Exercise 1: Create a Weather Card
**Objective:** Practice basic styling and flexbox layout

Create a weather card component that displays:
- City name (large, bold text)
- Current temperature (very large text)
- Weather condition icon and description
- High and low temperatures in a row
- Use appropriate colors, spacing, and shadows

**Hints**


### **Structure & Layout:**
1. Start with a container `View` with `padding`, `borderRadius`, and a subtle `shadow` for the card effect
2. Use nested `View` components to group related elements:
   - City name at the top
   - Temperature main display in center
   - Weather condition below that
   - High/low temperatures at the bottom
3. Use `flexDirection: 'row'` for side-by-side elements like icon+description and high+low temps

### **Styling Tips:**
4. Use `fontWeight: 'bold'` and `fontSize: 28-32` for city name
5. Use very large font (`fontSize: 60-80`) for current temperature
6. For the icon: use `Image` component with a weather icon from a free source (or emoji as fallback)
7. Use `justifyContent: 'space-between'` to spread high/low temps horizontally
8. Consider a gradient background or complementary colors (blues for cold, yellows/reds for warm)

### **Code Skeleton:**
```jsx
<View style={styles.card}>
  <Text style={styles.city}>City Name</Text>
  <Text style={styles.temp}>72°</Text>
  <View style={styles.conditionRow}>
    <Image source={...} style={styles.icon} />
    <Text style={styles.description}>Sunny</Text>
  </View>
  <View style={styles.highLowRow}>
    <Text style={styles.high}>H: 78°</Text>
    <Text style={styles.low}>L: 65°</Text>
  </View>
</View>
```

## Exercise 2: Build a Responsive Gallery
**Objective:** Practice responsive design and grid layouts

Create a photo gallery that:
- Displays 2 columns on small screens (< 375px)
- Displays 3 columns on medium screens (375px - 768px)
- Displays 4 columns on large screens (> 768px)
- Each item has a consistent aspect ratio
- Includes proper spacing between items

**
1. **Option A:** Use `Dimensions` API to get screen width and calculate columns:
```javascript
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
```
2. **Option B:** Use `useWindowDimensions` hook (React Native 0.61+):
```javascript
const { width } = useWindowDimensions();
```

### **Column Logic:**
3. Create a function to determine columns:
```javascript
const getColumns = () => {
  if (width < 375) return 2;
  if (width <= 768) return 3;
  return 4;
}
```

### **Grid Implementation:**
4. Use `FlatList` or `ScrollView` with `flexWrap: 'wrap'` and `flexDirection: 'row'`
5. Calculate item width dynamically:
```javascript
const columns = getColumns();
const itemWidth = (width - (spacing * (columns + 1))) / columns;
```
6. Use `margin` or `padding` for consistent spacing between items

### **Aspect Ratio:**
7. Set fixed `aspectRatio` on images (e.g., `aspectRatio: 1` for square, `aspectRatio: 4/3` for rectangular)
8. Or use percentage-based height relative to width:
```javascript
style={{ width: itemWidth, height: itemWidth * 0.75 }}
```

## Exercise 3: Implement a Theme Switcher (Take home)
**Objective:** Practice dynamic styling and theme management

Create an app that:
- Has light and dark themes
- Stores theme colors in a centralized theme object
- Toggles between themes with a button
- Updates all components when theme changes
- Uses proper color contrast for accessibility
