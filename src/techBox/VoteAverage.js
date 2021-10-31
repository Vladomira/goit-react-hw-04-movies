export default function generateVote(movie) {
  if (movie.vote_average) {
    const vote_average = movie.vote_average.toFixed(1);
    return vote_average;
  }
}
