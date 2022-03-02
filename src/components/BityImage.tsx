import * as React from 'react';
import { Image } from './BityImage.styles';
import title from '../../assets/bity-media-kit/bity_logo.png';

const BityImage: React.FC = () => {
    return (
        <a href='https://www.bity.com'>
            <Image
                src={title}
                width="210"
                height="75"
            ></Image>
        </a>
    )
}

export default BityImage;
