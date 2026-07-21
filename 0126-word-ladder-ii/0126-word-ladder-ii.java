class Solution {
    Map<String, Integer> map;
    List<List<String>> ans;
    String beginWord;

    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {

        Set<String> set = new HashSet<>(wordList);

        Deque<String> q = new ArrayDeque<>();

        this.beginWord = beginWord;

        q.offer(beginWord);

        set.remove(beginWord);

        map = new HashMap<>();
        map.put(beginWord, 0);

        while(!q.isEmpty()){

            String word = q.poll();

            int step = map.get(word);

            if(word.equals(endWord))
                break;

            char[] arr = word.toCharArray();

            for(int i = 0; i < word.length(); i++){

                char original = arr[i];

                for(char ch = 'a'; ch <= 'z'; ch++){

                    arr[i] = ch;

                    String newWord = new String(arr);

                    if(set.contains(newWord)){

                        set.remove(newWord);
                        q.offer(newWord);

                        map.put(newWord, step + 1);
                    }
                }

                arr[i] = original;
            }
        }

        ans = new ArrayList<>();

        if(map.containsKey(endWord)){

            List<String> seq = new ArrayList<>();
            seq.add(endWord);

            dfs(endWord, seq);
        }

        return ans;
    }

    private void dfs(String word, List<String> seq){

        if(word.equals(beginWord)){

            List<String> temp = new ArrayList<>(seq);

            Collections.reverse(temp);

            ans.add(temp);

            return;
        }

        int steps = map.get(word);

        char[] arr = word.toCharArray();

        for(int i = 0; i < word.length(); i++){

            char original = arr[i];

            for(char ch = 'a'; ch <= 'z'; ch++){

                arr[i] = ch;

                String newWord = new String(arr);

                if(map.containsKey(newWord) &&
                   map.get(newWord) == steps - 1){

                    seq.add(newWord);

                    dfs(newWord, seq);

                    seq.remove(seq.size() - 1);
                }
            }

            arr[i] = original;
        }
    }
}