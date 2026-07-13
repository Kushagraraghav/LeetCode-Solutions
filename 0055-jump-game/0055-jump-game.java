class Solution {
    public boolean canJump(int[] nums) {
        int n = nums.length;
        int last = 0 ;

        for(int i = 0 ; i<n;i++)
        {
            if (last < i) return false ;
            last = Math.max(last,nums[i]+i ) ;
            if(last >= n-1)
            return true;
        }
        return false;
        
    }
}