import { Image as ImageA, ImageProps as ImagePropsA } from 'antd'

type ImageProps = ImagePropsA & {
    // định nghĩa thêm props của mình
}

export const Image = (props: ImageProps) => {
    return <ImageA {...props} />
}

