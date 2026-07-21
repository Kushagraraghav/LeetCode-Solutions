class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) 
            return 0;
        Set<Integer> h = new HashSet<>();
        for (int num : nums) 
            h.add(num);
        int lStreak = 0;
        for (int num : h)
            if (!h.contains(num - 1)) {
                int numm = num;
                int cStreak = 1;
                while (h.contains(numm + 1)) {
                    numm++;
                    cStreak++;
                }
                lStreak = Math.max(lStreak, cStreak);
            }
        return lStreak;
    }
}