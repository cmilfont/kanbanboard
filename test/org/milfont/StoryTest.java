package org.milfont;


import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Calendar;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class StoryTest {

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	''
	@Test
	public void teste() throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException {
		Story story = new Story();
		
/*		Method[] methods = story.getClass().getDeclaredMethods();
		for (Method method: methods) {
			System.out.println(method.getName());
		}*/
		
		Class[] params = {java.util.Date.class, java.lang.String.class};
		Method method = story.getClass().getDeclaredMethod("metodoTeste", params);
		System.out.println(method.getName());
		method.setAccessible(true);
		Object[] arguments = {Calendar.getInstance().getTime(), "Funfou"};
		Object obj = method.invoke(story, arguments);
	}

}
