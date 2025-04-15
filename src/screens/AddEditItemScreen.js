import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/slices/itemsSlice';
import { addItemToDB, updateItemInDB } from '../services/database';

const AddEditItemScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editingItem = route.params?.item;

  const [name, setName] = useState(editingItem ? editingItem.name : '');
  const [description, setDescription] = useState(editingItem ? editingItem.description : '');
  const [errors, setErrors] = useState({ name: '', description: '' });

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (editingItem) {
        updateItemInDB(editingItem.id, name, description, () => {
          dispatch(updateItem({ id: editingItem.id, name, description }));
          navigation.goBack();
        });
      } else {
        addItemToDB(name, description, () => {
          dispatch(addItem({ id: Date.now(), name, description }));
          navigation.goBack();
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingItem ? 'Edit Item' : 'Add New Item'}</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) {
            setErrors({ ...errors, name: '' });
          }
        }}
        style={[styles.input, errors.name && styles.inputError]}
        placeholderTextColor="#999"
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          if (errors.description) {
            setErrors({ ...errors, description: '' });
          }
        }}
        style={[styles.input, errors.description && styles.inputError]}
        placeholderTextColor="#999"
        multiline
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    color: '#333',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3, // subtle shadow
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddEditItemScreen;
