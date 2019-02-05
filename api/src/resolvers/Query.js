function songs(root, args, context, info) {
   return context.prisma.songs()
}

module.exports = {
    songs,
}
