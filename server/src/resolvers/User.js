
function songs(parent, args, context) {
      return context.prisma.user({ id: parent.id }).songs()
}

module.exports = {
      songs,
}
