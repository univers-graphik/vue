export default {
  name: 'ParentElementRender',
  functional: true,
  render (h, ctx) {
    // Remove unnecessary text nodes
    const children = ctx.children.filter(vnode => vnode.tag)
    if (children.length !== 1) {
      console.warn('this component accepts only one root node in its slot')
    }

    return ctx.props.show ? children[0] : children[0].children
  }
}
