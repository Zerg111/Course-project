import React from "react"
import CollapseWrapper from "../common/collapse"
import PropTypes from "prop-types"

const ListComponent = ({ children }) => {
    return React.Children.map(children, (child, index) => {
        const config = {
            ...child.props,
            ordinalNum: index + 1,
            key: index
        }
        return React.cloneElement(child, config)
    })
}

const ChildrenExercise = () => {
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть компоненты Списка. Вам необходимо к каждому из них
                добавить порядковый номер, относительно того, как они
                располагаются на странице. Вы можете использовать как{" "}
                <code>React.Children.map</code> так и{" "}
                <code>React.Children.toArray</code>
            </p>
            <ListComponent>
                <Component />
                <Component />
                <Component />
            </ListComponent>
        </CollapseWrapper>
    )
}

const Component = ({ ordinalNum }) => {
    return <div>{ordinalNum}. Компонент списка</div>
}

Component.propTypes = {
    ordinalNum: PropTypes.node
}

export default ChildrenExercise
