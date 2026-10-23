import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useAuth } from '../../../contexts/AuthContext';
import { Text } from 'react-native-paper';
import { THEME } from '../../../lib/configs/Theme';
import Icon from '@react-native-vector-icons/ant-design';
import { DashboardItemType } from '../../../lib/schemas/dashboardItemType';

const DashBoardData: DashboardItemType[] = [
  {
    id: 1,
    icon: 'home',
    title: 'মোট শিক্ষক',
    subTitle: '54',
    iconColor: '#FFF',
    iconBg: '#1dbe0e',
    secBgColor: '#0b4e03',
  },
  {
    id: 2,
    icon: 'user',
    title: 'মোট শিক্ষার্থী',
    subTitle: '540',
    iconColor: '#FFF',
    iconBg: '#0434d1',
    secBgColor: '#043e6b',
  },
  {
    id: 3,
    icon: 'book',
    title: 'মোট শ্রেণী',
    subTitle: '12',
    iconColor: '#FFF',
    iconBg: '#d4049d',
    secBgColor: '#7a064e',
  },
  {
    id: 4,
    icon: 'edit',
    title: 'মোট পরীক্ষা',
    subTitle: '8',
    iconColor: '#FFF',
    iconBg: '#c4c00a',
    secBgColor: '#7c4f0c',
  },
];

const InfoDisplaySection = () => {
  return (
    <View style={styles.dashboardContainer}>
      {DashBoardData.map(item => (
        <View
          key={item.id}
          style={[styles.dashboardCard, { backgroundColor: item.secBgColor }]}
        >
          {/* Top Section */}
          <View style={styles.cardHeader}>
            <View
              style={[styles.iconContainer, { backgroundColor: item.iconBg }]}
            >
              <Icon name={item.icon} color={item.iconColor} size={20} />
            </View>
            {/* Bottom Section */}
            <View style={styles.cardContent}>
              <Text variant="labelMedium" style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text variant="headlineSmall" style={styles.cardValue}>
                {item.subTitle}
              </Text>
            </View>

            <Icon name="right" color={item.iconColor} size={18} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default InfoDisplaySection;

const styles = StyleSheet.create({
  dashboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  dashboardCard: {
    width: '48%',
    height: 80,
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'space-between',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    marginTop: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontFamily: THEME.HindSiliguriFont.BOLD,
  },
  cardValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: THEME.HindSiliguriFont.REGULAR,
    textAlign: 'center',
  },
});
