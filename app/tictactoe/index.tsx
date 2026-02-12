import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  child: {
    borderColor: 'black',
    borderWidth: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowcontainer: {
    flexDirection: 'row',
  },

  symbol: {
    fontSize: 244,
    fontWeight: 'bold',
  },
});

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState(0);

  const onPressButton = (cell:number) => {
    if (board[cell] !== '') return; 

    const newBoard = [...board];
    newBoard[cell] = turn % 2 === 0 ? 'O' : 'X';

    setBoard(newBoard);
    setTurn(turn + 1);
  };

  const renderCell = (index:number) => (
    <TouchableOpacity
      key={index}
      style={styles.child}
      onPress={() => onPressButton(index)}
    >
      <Text style={styles.symbol}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowcontainer}>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </View>

      <View style={styles.rowcontainer}>
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </View>

      <View style={styles.rowcontainer}>
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </View>

      <Text style={{ marginTop: 10 }}>
        Turn: {turn % 2 === 0 ? 'O' : 'X'}
      </Text>
    </View>
  );
}
