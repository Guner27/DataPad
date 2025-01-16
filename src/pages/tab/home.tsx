import React from 'react';
import PageView from '../../components/PageView';
import MText from '../../components/MText';

export default function HomeScreen(){
    return(
        <PageView>
            <MText type="title">Başlık</MText>
            <MText> Home Sayfası</MText>
        </PageView>
    );
}
