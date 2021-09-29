const Layout = props => {
    return (
        <div style={{height: 1000}}>
            <main>{props.children}</main>
        </div>
    )
}

export default Layout;