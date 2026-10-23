import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { AntDesign as Icon } from '@react-native-vector-icons/ant-design';

type IconName = React.ComponentProps<typeof Icon>['name'];

export interface Branch {
  id: string;
  label: string;
  value: string;
}

interface CustomPickerProps<T extends FieldValues> {
  control: Control<T>;
  data?: (Branch | null | undefined)[];
  name: Path<T>;
  pickerTitle: string;
  iconName?: IconName | null;
}

function CustomPicker<T extends FieldValues>({
  control,
  data = [],
  name,
  pickerTitle,
  iconName = null,
}: CustomPickerProps<T>) {
  const [visible, setVisible] = useState(false);

  const safeData: Branch[] = data.filter(
    (item): item is Branch =>
      item != null &&
      typeof item.id === 'string' &&
      typeof item.label === 'string' &&
      typeof item.value === 'string',
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedBranch = safeData.find(item => item.value === value);

        return (
          <View style={styles.container}>
            {/* Picker Button */}
            <Pressable
              style={styles.picker}
              onPress={() => setVisible(true)}
              accessibilityRole="button"
              accessibilityLabel={pickerTitle}
            >
              <View style={styles.pickerContent}>
                {/* Optional Left Icon */}
                {iconName ? (
                  <Icon
                    name={iconName}
                    size={22}
                    color="#666"
                    style={styles.pickerIcon}
                  />
                ) : null}

                <Text
                  style={[
                    styles.pickerText,
                    !selectedBranch && styles.placeholder,
                  ]}
                >
                  {selectedBranch?.label ?? 'শাখা বাছাই করুন'}
                </Text>
              </View>

              <Text style={styles.arrow}>▼</Text>
            </Pressable>

            {/* Validation Error */}
            {error?.message ? (
              <Text style={styles.error}>{String(error.message)}</Text>
            ) : null}

            {/* Branch Selection Modal */}
            <Modal
              visible={visible}
              transparent
              animationType="fade"
              onRequestClose={() => setVisible(false)}
              statusBarTranslucent
            >
              <View style={styles.overlay}>
                {/* Background Overlay */}
                <Pressable
                  style={styles.backdrop}
                  onPress={() => setVisible(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Modal বন্ধ করুন"
                />

                <View style={styles.modal}>
                  {/* Modal Header with Cross Button */}
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{pickerTitle}</Text>

                    <Pressable
                      onPress={() => setVisible(false)}
                      style={styles.closeIcon}
                      hitSlop={10}
                      accessibilityRole="button"
                      accessibilityLabel="বন্ধ করুন"
                    >
                      <Text style={styles.closeIconText}>✕</Text>
                    </Pressable>
                  </View>

                  {/* Branch List */}
                  {safeData.length === 0 ? (
                    <Text style={styles.empty}>কোনো শাখা পাওয়া যায়নি।</Text>
                  ) : (
                    <FlatList
                      data={safeData}
                      keyExtractor={item => item.id}
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator
                      renderItem={({ item }) => (
                        <Pressable
                          style={[
                            styles.option,
                            value === item.value && styles.selectedOption,
                          ]}
                          onPress={() => {
                            onChange(item.value);
                            setVisible(false);
                          }}
                          accessibilityRole="button"
                          accessibilityLabel={item.label}
                          accessibilityState={{
                            selected: value === item.value,
                          }}
                        >
                          <Text style={styles.optionText}>{item.label}</Text>

                          {value === item.value ? (
                            <Text style={styles.checkmark}>✓</Text>
                          ) : null}
                        </Pressable>
                      )}
                    />
                  )}
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
}

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    fontFamily: 'HindSiliguri-SemiBold',
  },

  picker: {
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#7c7a7a',
    borderRadius: 5,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  pickerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  pickerIcon: {
    marginRight: 10,
  },

  pickerText: {
    fontSize: 15,
    color: '#0c0b0b',
    fontFamily: 'HindSiliguri-SemiBold',
    flex: 1,
    paddingLeft: 8,
  },

  placeholder: {
    color: '#161616',
    fontFamily: 'HindSiliguri-SemiBold',
  },

  arrow: {
    color: '#666',
    marginLeft: 8,
  },

  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'HindSiliguri-Regular',
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  modal: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    flex: 1,
    fontFamily: 'HindSiliguri-SemiBold',
  },

  closeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
    marginLeft: 10,
  },

  closeIconText: {
    fontSize: 20,
    color: '#444',
    fontWeight: '600',
  },

  empty: {
    fontSize: 14,
    color: '#777',
    paddingVertical: 20,
    textAlign: 'center',
    fontFamily: 'HindSiliguri-Regular',
  },

  option: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedOption: {
    backgroundColor: '#e8f5e9',
  },

  optionText: {
    fontSize: 15,
    color: '#222',
    fontFamily: 'HindSiliguri-SemiBold',
  },

  checkmark: {
    color: '#2e7d32',
    fontSize: 18,
    fontWeight: '700',
  },
});
