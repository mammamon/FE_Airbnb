import { Tabs as TabsA, TabsProps as TabsPropsA, TabPaneProps} from 'antd'

type TabsProps = TabsPropsA & TabPaneProps

export const Tab = (props: TabsProps) => {
    return <TabsA {...props} />
}
