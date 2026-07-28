class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> a=new ArrayList<>();
        boolean[] vis=new boolean[numCourses];
        boolean[] rec=new boolean[numCourses];
        int ind=0;
        int[] res=new int[numCourses];
        Stack<Integer> s=new Stack<>();
        for(int i=0;i<numCourses;i++) a.add(new ArrayList<>());
        for(int p[]:prerequisites) a.get(p[1]).add(p[0]);
        for(int i=0;i<numCourses;i++){
            if(!vis[i]) if(cycle(a,i,vis,rec,s)) return new int[0];
        }
        while(!s.isEmpty()) res[ind++]=s.pop();
        return res;
    }
    public boolean cycle(List<List<Integer>> a,int curr,boolean[] vis,boolean[] rec,Stack<Integer> s){
        vis[curr]=true;
        rec[curr]=true;
        for(int i:a.get(curr)){
            if(!vis[i] && cycle(a,i,vis,rec,s)) return true;
            else if(rec[i]) return true;
        }
        rec[curr]=false;
        s.push(curr);
        return false;
    }
}