import { Button as ButtonA, ButtonProps as ButtonPropsA } from 'antd'

type ButtonProps = ButtonPropsA & {
    // định nghĩa thêm props của mình
}

export const Button = (props: ButtonProps) => {
    return <ButtonA {...props} />
}
