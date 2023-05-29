package <%= configOptions.packageName %>.endpoint;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class EchoControllerTest {

    @InjectMocks
    private EchoController echoController;

    @Test
    public void techEcho(){
        String s = echoController.echo("message");
        assertEquals("message", s);
    }

    @Test
    public void techEchoAndStatus(){
        ResponseEntity<String> result = echoController.echoWithStatus("message", 200);
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("message", result.getBody());
    }
}