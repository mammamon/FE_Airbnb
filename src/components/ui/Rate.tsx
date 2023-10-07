import { Rate as RateA, RateProps as RatePropsA } from "antd"

type RateProps = RatePropsA 

export const Rate = (props: RateProps) => {
    return <RateA {...props} />
}

