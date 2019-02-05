
function createdBy(parent, args, context) {
    return context.prisma.song({ id: parent.id }).createdBy()
}

module.exports = {
      createdBy,
}
