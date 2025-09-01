const FeedShimmer = () => {
  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-950 to-black">
    {/* Heading at the top, centered */}
    <h1 className="text-3xl md:text-4xl font-bold text-white text-center pt-8">
      Wanna See More Devs?,{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
        Load More
      </span>
    </h1>
  </div>
);

};
export default FeedShimmer;