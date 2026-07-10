class Solution {
    public String getPermutation(int n, int k) {
        if(n == 1) return "1";
        StringBuilder sb = new StringBuilder();
        for(int i = 1; i <= n; i++) sb.append(i);
        int factorial = 1;
        for(int i = 2; i < n; i++) factorial *= i;
        n--;

        StringBuilder result = new StringBuilder();
        while(k > 0) {
            if(k % factorial == 0) {
                result.append(sb.charAt((k / factorial) - 1));
                sb.deleteCharAt((k / factorial) - 1);
            } else {
                result.append(sb.charAt(k / factorial));
                sb.deleteCharAt(k / factorial);
            } 

            k %= factorial;
            factorial /= n;
            n--;
        }

        for(int i = sb.length() - 1; i >= 0; i--) result.append(sb.charAt(i));
        return result.toString();
    }
}