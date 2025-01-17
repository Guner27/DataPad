import React from 'react';
import PageView from '../../components/PageView';
import MText from '../../components/MText';
import TabHeader from '../../components/TabHeader';

export default function CategoryScreen() {
  return (
    <>
      <TabHeader title="Kategoriler" buttonName="pluscircleo" />
      <PageView>
        <MText> Kategori Sayfası</MText>
      </PageView>
    </>
  );
}
