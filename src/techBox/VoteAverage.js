export default function generateVote(data) {
  if (data) {
    const vote_average = data.toFixed(1);
    return vote_average;
  }
}
