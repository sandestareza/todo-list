import React from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom';
import DetailContent from '../../components/Organisms/DetailContent';

const Detail = () => {

    const { id } = useParams();

    return (
        <Layout>
            <DetailContent id={id}/>
        </Layout>
    )
}

export default Detail