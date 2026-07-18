class Solution {
    public int lower(int[] nums, int n, int target) {
        int high = n - 1;
        int ans = n;
        int low = 0;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (nums[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    public int higher(int[] nums, int n, int target) {
        int low = 0;
        int high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = (low + high) / 2;

            if (nums[mid] > target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    public int[] searchRange(int[] nums, int target) {
        int n = nums.length;

        int lowee = lower(nums, n, target);

        if (lowee == n || nums[lowee] != target) {
            return new int[] {-1, -1};
        }

        return new int[] {lowee, higher(nums, n, target) - 1};
    }
}