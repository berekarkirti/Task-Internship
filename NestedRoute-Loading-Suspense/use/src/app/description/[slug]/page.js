
import Description from '@/component/product/description/description';
import { product } from '@/data/product';
import React from 'react'

const DescriptionPage = async ({ params }) => {
    const { slug } = await params;
    console.log(slug)
    const description = product.find((z) => z.slug === slug);
    console.log(description)
    return (
        <div>
            <Description description={description} />
        </div>
    )
}

export default DescriptionPage
