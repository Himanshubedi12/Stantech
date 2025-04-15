import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, deleteItem } from '../redux/slices/itemsSlice';
import { createTable, getAllItems, deleteItemFromDB } from '../services/database';
import ItemCard from '../components/ItemCard';

const ItemListScreen = ({ navigation }) => {
  const items = useSelector(state => state.items.list);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    createTable();
    loadItems();
  }, []);

  const loadItems = () => {
    setIsLoading(true);
    getAllItems(items => {
      dispatch(setItems(items));
      setIsLoading(false);
    });
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setIsLoading(true);
            deleteItemFromDB(id, (success) => {
              if (success) {
                dispatch(deleteItem(id));
              } else {
                Alert.alert(
                  'Error',
                  'Failed to delete item. Please try again.',
                  [{ text: 'OK' }]
                );
              }
              setIsLoading(false);
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items available.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Add/Edit Item')}
        disabled={isLoading}
      >
        <Text style={styles.addButtonText}>+ Add New Item</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          <ItemCard
            item={item}
            onEdit={() => navigation.navigate('Add/Edit Item', { item })}
            onDelete={handleDelete}
            disabled={isLoading}
          />
        }
        contentContainerStyle={{ paddingVertical: 10 }}
        ListEmptyComponent={!isLoading && renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ItemListScreen;
