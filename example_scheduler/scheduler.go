package example_scheduler

import (
	log "github.com/Sirupsen/logrus"
	"github.com/golang/protobuf/proto"
	"github.com/mesos/mesos-go/mesosproto"
	"github.com/mesos/mesos-go/scheduler"
)

type ExampleScheduler struct {
	ExecutorInfo *mesosproto.ExecutorInfo
	WsCh         chan mesosproto.Offer
}

//StatusUpdate is called by a running task to provide status information to the
//scheduler.
func (s *ExampleScheduler) StatusUpdate(driver scheduler.SchedulerDriver, status *mesosproto.TaskStatus) {
	log.Infoln("Status update: task", status.TaskId.GetValue(), " is in state ", status.State.Enum().String())
}

//ResourceOffers will be called by the Mesos framework to provide an array of
//offers to this framework. Is up to you to check the content of the offers
//and to accept or reject them if they don't fit the needs of the framework
func (s *ExampleScheduler) ResourceOffers(driver scheduler.SchedulerDriver, offers []*mesosproto.Offer) {
	for _, offer := range offers {
		s.WsCh <- *offer
		driver.DeclineOffer(offer.Id, &mesosproto.Filters{RefuseSeconds: proto.Float64(1)})
	}
}
