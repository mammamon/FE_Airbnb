import { Modal as ModalA, ModalProps as ModalPropsA } from 'antd'

type ModalObject = {
    (props: ModalPropsA): JSX.Element
}

export const Modal: ModalObject = (props) => {
    return <ModalA {...props} />
}
