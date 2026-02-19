import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    containerparent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#222222' : '#ffffff',

    },
    container: {
      backgroundColor: isDark ? '#222222' : '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowcontainer: {
      flexDirection: 'row',
    },
    child: {
      borderColor: isDark ? '#ffffff' : 'black',
      borderWidth: 2,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#333333' : '#ffffff',
    },
    symbol: {
      fontSize: 48,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : 'black',
    },
    turnText: {
      marginTop: 10,
      fontSize: 18,
      color: isDark ? '#ffffff' : 'black',
    },
    winnerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      color: isDark ? '#ffffff' : 'black',
    },
    button: {
      marginTop: 10,
      backgroundColor: isDark ? '#f89090ff' : '#dddddd',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: isDark ? '#ffffff' : 'black',
      fontSize: 16,
    },
    toggleButton: {
      marginBottom: 20,
      backgroundColor: isDark ? '#555555' : '#dddddd',
      padding: 10,
      borderRadius: 5,
    },
    toggleText: {
      color: isDark ? '#ffffff' : 'black',
      fontSize: 14,
    },
    scoreText: {
      fontSize: 16,
      color: isDark ? '#ffffff' : 'black',
      marginBottom: 5,
    },
  });

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [scoreO, setScoreO] = useState(0);
  const [scoreX, setScoreX] = useState(0);
  const [scoreDraw, setScoreDraw] = useState(0);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const savedO = localStorage.getItem('scoreO');
    const savedX = localStorage.getItem('scoreX');
    const savedDraw = localStorage.getItem('scoreDraw');

    if (savedO) setScoreO(Number(savedO));
    if (savedX) setScoreX(Number(savedX));
    if (savedDraw) setScoreDraw(Number(savedDraw));
  }, []);

  const checkWinner = (b: string[]) => {
    if (b[0] && b[0] === b[1] && b[1] === b[2]) return b[0];
    if (b[3] && b[3] === b[4] && b[4] === b[5]) return b[3];
    if (b[6] && b[6] === b[7] && b[7] === b[8]) return b[6];
    if (b[0] && b[0] === b[3] && b[3] === b[6]) return b[0];
    if (b[1] && b[1] === b[4] && b[4] === b[7]) return b[1];
    if (b[2] && b[2] === b[5] && b[5] === b[8]) return b[2];
    if (b[0] && b[0] === b[4] && b[4] === b[8]) return b[0];
    if (b[2] && b[2] === b[4] && b[4] === b[6]) return b[2];
    if (b.every(cell => cell !== '')) return 'Draw';
    return '';
  };

  const onPressButton = (cell: number) => {
    if (board[cell] !== '' || winner) return;

    const newBoard = [...board];
    newBoard[cell] = turn % 2 === 0 ? 'O' : 'X';
    setBoard(newBoard);
    setTurn(turn + 1);

    const result = checkWinner(newBoard);

    if (result === 'O') {
      const newScore = scoreO + 1;
      setScoreO(newScore);
      localStorage.setItem('scoreO', String(newScore));
      setWinner('O');
    } else if (result === 'X') {
      const newScore = scoreX + 1;
      setScoreX(newScore);
      localStorage.setItem('scoreX', String(newScore));
      setWinner('X');
    } else if (result === 'Draw') {
      const newScore = scoreDraw + 1;
      setScoreDraw(newScore);
      localStorage.setItem('scoreDraw', String(newScore));
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setTurn(0);
    setWinner('');
  };

  const resetScore = () => {
    setScoreO(0);
    setScoreX(0);
    setScoreDraw(0);
    localStorage.setItem('scoreO', '0');
    localStorage.setItem('scoreX', '0');
    localStorage.setItem('scoreDraw', '0');
  };

  const renderCell = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.child}
      onPress={() => onPressButton(index)}
    >
      <Text style={styles.symbol}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const styles = getStyles(isDark);

  return (
    <View style={styles.containerparent}>
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsDark(!isDark)}>
        <Text style={styles.toggleText}>{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
      </TouchableOpacity>

      <Text style={styles.scoreText}>Player O: {scoreO}</Text>
      <Text style={styles.scoreText}>Player X: {scoreX}</Text>
      <Text style={styles.scoreText}>Draw: {scoreDraw}</Text>

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
      </View>

      {winner !== '' ? (
        <Text style={styles.winnerText}>
          {winner === 'Draw' ? 'It is a Draw' : 'Player ' + winner + ' Wins'}
        </Text>
      ) : (
        <Text style={styles.turnText}>Turn: Player {turn % 2 === 0 ? 'O' : 'X'}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetScore}>
        <Text style={styles.buttonText}>Reset Score</Text>
      </TouchableOpacity>
    </View>
  );
}