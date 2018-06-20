package com.sunyard.dispatch.common;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPool {
	/**可伸缩连接池*/
	private static ExecutorService Exe = Executors.newCachedThreadPool();
	
	public static void execute(Runnable runnable){
		Exe.execute(runnable);
	}
	
	public static void close(){
		Exe.shutdown();
	}
}
