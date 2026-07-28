class Solution 
{
    public static  int Sieve(int R)
    {
        boolean[] P=new boolean[R+1];
        Arrays.fill(P,true);
        P[0]=P[1]=false;
        for(int i=2;i<=R;i++)
        {
            if(P[i])
            {
                for(long j=(long)i*i;j<=R;j+=i)
                {
                    P[(int)j]=false;
                }
            }
        }
        int arr=0;
        for(boolean e : P)
        {
            if(e)
            {
                arr++;
            }
        }
        return arr;
    }
    public int countPrimes(int n) 
    {
        if(n==0 || n==1 || n-1==1)
        {
            return 0;
        }
        return Sieve(n-1);
    }
}