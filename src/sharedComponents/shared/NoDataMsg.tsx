import RenderText from '../utils/RenderText';
import BoxSpace from './BoxSpace';

type Props = {
    className?: string;
    variable: string;
    group: string;
}
export default function NoDataMsg({ className = '', group, variable }: Props) {
    return (
        <BoxSpace className={className}>
            <p><RenderText group={group} variable={variable} /></p>
        </BoxSpace>
    )
}
