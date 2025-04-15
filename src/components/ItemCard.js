import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ItemCard = ({ item, onEdit, onDelete, disabled }) => {
  return (
    <View style={[styles.card, disabled && styles.disabled]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => onEdit(item)} 
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => onDelete(item.id)} 
          disabled={disabled}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {disabled && <ActivityIndicator size="small" color="#555" style={styles.loader} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#FFF',
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    position: 'relative',
  },
  disabled: {
    opacity: 0.6
  },
  title: { 
    fontSize: 20, 
    fontWeight: '700',
    color: '#222',
    marginBottom: 6
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 14
  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    gap: 10
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#2563EB',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10
  }
});

export default ItemCard;
