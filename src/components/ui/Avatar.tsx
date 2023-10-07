import { Avatar as AvatarA, AvatarProps as AvatarPropsA } from 'antd'
import { GroupProps } from 'antd/es/avatar'

type AvatarObject = {
    (props: AvatarPropsA): JSX.Element
    Group: React.FC<GroupProps>
}

export const Avatar: AvatarObject = (props) => {
    return <AvatarA {...props} />
}

Avatar.Group = AvatarA.Group
