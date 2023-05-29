package <%= configOptions.packageName %>.endpoint;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

@RestController
@RequestMapping("echo")
public class EchoController {

    @PostMapping("")
    public String echo(@RequestBody String s){
        s = HtmlUtils.htmlEscape(s);
        return s;
    }

    public ResponseEntity<String> echoWithStatus(@RequestBody String message, @PathVariable("code") Integer code){
        message = HtmlUtils.htmlEscape(message);
        return ResponseEntity.status(code).body(message);
    }
}