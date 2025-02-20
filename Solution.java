import java.util.*;

class Solution {
    public static void main(String[] args) {
        int[] arr = { 5, 15, 1, 3, 2, 8 };
        System.out.println(new Solution().getMedian(arr));
    }

    public ArrayList<Double> getMedian(int[] arr) {
        ArrayList<Double> result = new ArrayList<>();
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : arr) {
            if (maxHeap.isEmpty() || num <= maxHeap.peek()) {
                maxHeap.add(num);
            } else {
                minHeap.add(num);
            }

            if (maxHeap.size() > minHeap.size() + 1) {
                minHeap.add(maxHeap.poll());
            } else if (minHeap.size() > maxHeap.size()) {
                maxHeap.add(minHeap.poll());
            }

            if (maxHeap.size() == minHeap.size()) {
                result.add((maxHeap.peek() + minHeap.peek()) / 2.0);
            } else {
                result.add((double) maxHeap.peek());
            }
        }
        return result;
    }
}
