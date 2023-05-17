/**
 * 本地搜索器-search
 */

var searchFunc = function(path, search_id, content_id)
{
  // var BTN = "<i id='local-search-close'>x</i>";
  $.ajax(
  {
    url: path,
    dataType: "xml",
    success: function(xmlResponse)
    {
      var datas = $("entry", xmlResponse).map(function()
      {
        return {
          title: $("title", this).text(),
          content: $("content", this).text(),
          url: $("url", this).text()
        };
      }).get();

      var $input = document.getElementById(search_id);
      var $resultContent = document.getElementById(content_id);
      
      // judge $input is not null.
      if ($input)
{
  $input.addEventListener('input', function()
      {
        // var str = '<ul class=\"search-result-list\">';
        var str = '<ul>';
        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0)
        {
          document.getElementById(content_id).style.display="none";
          return;
        }
        else
        {
          document.getElementById(content_id).style.display="";
        }
        datas.forEach(function(data)
        {
          var isMatch = true;
          var content_index = [];
          if (!data.title || data.title.trim() === '')
          {
            data.title = "Untitled";
          }
          var data_title = data.title.trim().toLowerCase();
          var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          if (data_content !== '')
          {
            keywords.forEach(function(keyword, i)
            {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);

              if (index_title < 0 && index_content < 0)
              {
                isMatch = false;
              }
              else
              {
                if (index_content < 0)
                {
                  index_content = 0;
                }
                if (i == 0)
                {
                  first_occur = index_content;
                }
              }
            });
          }
          else
          {
            isMatch = false;
          }
          if (isMatch)
          {
            // str += "<li><a href='" + unescape(decodeURI(data_url)) + "' class='search-result-title'>" + data_title + "</a>";

            keywords.forEach(function(keyword)
            {
              // 修改标题关键词高亮
              var regS = new RegExp(keyword + "(?![^<>]*>)", "gi");
              // <abbr style='border-bottom:1px dotted #eb5055'></abbr>
              data_title = data_title.replace(regS, "<strong><font style='color:#eb5055;'>" + keyword + "</font></abbr></strong>");
            });

            str += "<li><a href='" + unescape(decodeURI(data_url)) + "'>" + data_title + "</a>";
            var content = data.content.trim().replace(/<[^>]+>/g, "");
            if (first_occur >= 0)
            {
              var start = first_occur - 20;
              var end = first_occur + 80;

              if (start < 0)
              {
                start = 0;
              }

              if (start == 0)
              {
                end = 100;
              }

              if (end > content.length)
              {
                end = content.length;
              }

              var match_content = content.substr(start, end - start);

              keywords.forEach(function(keyword)
              {
                // 修改内容关键词高亮
                var regS = new RegExp(keyword + "(?![^<>]*>)", "gi");
                match_content = match_content.replace(regS, "<font style='color:#eb5055;'>" + keyword + "</font>");
              });
              str += "<p class=\"search-result\">" + match_content + "...</p>"
            }
            str += "</li>";
          }
        });
        str += "</ul>";
        if (str.indexOf('<li>') === -1)
        {
          // return $resultContent.innerHTML = BTN + "<ul><span class='local-search-empty'>没有找到内容，更换下搜索词试试吧~<span></ul>";
          // 不想用关闭功能
          return $resultContent.innerHTML = "<ul><span>似乎什么都木有，换个关键词试试吧~<span></ul>";
        }
        // $resultContent.innerHTML = BTN + str;
        // 不想用关闭功能
        $resultContent.innerHTML = str;
      });
}
      
    }
  });
  $(document).on('click', '#local-search-close', function()
  { // 关闭
    $('#local-search-input').val('');
    $('#local-search-result').html('');
  });
}