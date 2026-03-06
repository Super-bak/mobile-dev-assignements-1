import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#007AFF',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

function Recipe() {
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>
        Recipes
      </Text>

      {RECIPES.map((recipe) => (
        <View key={recipe.id} style={styles.card}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          
          <Text style={styles.title}>{recipe.title}</Text>
          
          <Text style={styles.info}>⏱️ {recipe.cookTime} min</Text>
          
          <Text style={styles.info}>Difficulty: {recipe.difficulty}</Text>
          
          <Text style={styles.info}>⭐ {recipe.rating}/5</Text>
          
          <View style={styles.tagsRow}>
            {recipe.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default Recipe;
