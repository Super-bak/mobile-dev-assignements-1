import { Text } from 'react-native';

interface TagProps {
    text:string,
    variant:string,
    onPress: boolean,
}

type Variant = keyof typeof colors;
// = "default" | "primary" | "success" | "warning" | "danger"
const colors = {
  default: { bg: '#e0e0e0', texts: '#666' },
  primary: { bg: '#007AFF', texts: '#fff' },
  success: { bg: '#34C759', texts: '#fff' },
  warning: { bg: '#FF9500', texts: '#fff' },
  danger: { bg: '#FF3B30', texts: '#fff' },
};


 
function Tag({ text, variant = 'default', onPress }: TagProps) {
  const  {bg, texts } = colors[variant as Variant] || colors['default'];

  return <Text style={{
    backgroundColor: bg,
    color: texts,
    fontSize: 50,
    borderRadius: 10
  }}
  >
    {text}
    </Text>
}

export default Tag;