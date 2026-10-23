import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { AntDesign as Icon } from '@react-native-vector-icons/ant-design';

type IconName = React.ComponentProps<typeof Icon>['name'];

type ControlledInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  inputAreaStyle?: StyleProp<ViewStyle>;
  isPasswordField?: boolean;
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
  leftIconName?: IconName | null;
} & React.ComponentProps<typeof TextInput>;

const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  inputAreaStyle,
  isPasswordField = false,
  showPassword = false,
  onTogglePasswordVisibility,
  leftIconName = null,
  ...TextInputProps
}: ControlledInputProps<TFieldValues>) => {
  const [internalShowPassword, setInternalShowPassword] = React.useState(false);

  const passwordVisible = onTogglePasswordVisibility
    ? showPassword
    : internalShowPassword;

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error, invalid },
      }) => (
        <View style={inputAreaStyle}>
          <TextInput
            {...TextInputProps}
            contentStyle={{
              fontFamily: 'HindSiliguri-SemiBold',
            }}
            theme={{
              fonts: {
                bodyLarge: {
                  fontFamily: 'HindSiliguri-SemiBold',
                },
                bodySmall: {
                  fontFamily: 'HindSiliguri-SemiBold',
                },
              },
            }}
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={invalid}
            secureTextEntry={
              isPasswordField
                ? !passwordVisible
                : Boolean(TextInputProps.secureTextEntry)
            }
            left={
              leftIconName ? (
                <TextInput.Icon
                  icon={() => (
                    <Icon name={leftIconName} size={20} color="#666" />
                  )}
                />
              ) : undefined
            }
            right={
              isPasswordField ? (
                <TextInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  color="#333"
                  onPress={() => {
                    if (onTogglePasswordVisibility) {
                      onTogglePasswordVisibility();
                      return;
                    }

                    setInternalShowPassword(prev => !prev);
                  }}
                />
              ) : undefined
            }
          />

          {invalid && error?.message ? (
            <View style={styles.errorContainer}>
              <Icon name="warning" color="red" size={15} />
              <HelperText
                type="error"
                visible={invalid}
                style={{
                  fontFamily: 'HindSiliguri-SemiBold',
                  color: '#989898',
                }}
              >
                {error.message}
              </HelperText>
            </View>
          ) : null}
        </View>
      )}
    />
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
});
