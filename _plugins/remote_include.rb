require 'net/http'

module Jekyll
  # Remotely fetch a file.
  class RemoteMarkdownTag < Liquid::Tag
    def initialize(tag_name, content, tokens)
      super
      @content = content.strip!
    end

    def render(_context)
      url = "#{_context[@content.strip]}"

      check_protocol(url)
      uri = URI(url)

      res = Net::HTTP.get_response(uri)
      #fail 'resource unavailable' unless res.is_a?(Net::HTTPSuccess)
      if (res.is_a?(Net::HTTPSuccess))        
        @content = res.body.force_encoding("UTF-8")
        @content
      end
    end

    private

    def check_protocol(text)
      error_message = "remote_include: invalid URI given #{text}"
      fail error_message unless text =~ URI.regexp(%w(http https ftp ftps))
    end

  end
end

Liquid::Template.register_tag('remote_include', Jekyll::RemoteMarkdownTag)